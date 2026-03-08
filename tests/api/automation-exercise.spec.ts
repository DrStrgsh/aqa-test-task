import { expect, test } from '@playwright/test'
import { makeUniqueUser } from '@src/factories/api/user.factory'
import { getJsonResponse } from '@src/utils/api-response'
import type {
  ProductsResponse,
  BrandsResponse,
  GenericMessageResponse,
  SearchProductsResponse,
  UserDetailResponse,
} from '@src/types/api/automation-exercise.types'

test.describe('AutomationExercise API', () => {
  test('GET /api/productsList returns products list (positive)', async ({ request }) => {
    const response = await request.get('/api/productsList')
    expect(response.status()).toBe(200)

    const body = await getJsonResponse<ProductsResponse>(response)
    expect(body.responseCode).toBe(200)
    expect(Array.isArray(body.products)).toBe(true)
    expect(body.products.length).toBeGreaterThan(0)
    expect(body.products[0]).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      price: expect.any(String),
      brand: expect.any(String),
      category: {
        usertype: {
          usertype: expect.any(String),
        },
        category: expect.any(String),
      },
    })
  })

  test('POST /api/productsList returns 405 (negative)', async ({ request }) => {
    const response = await request.post('/api/productsList')
    expect(response.status()).toBe(200)

    const body = await getJsonResponse<GenericMessageResponse>(response)
    expect(body).toEqual({
      responseCode: 405,
      message: 'This request method is not supported.',
    })
  })

  test('GET /api/brandsList returns brands list (positive)', async ({ request }) => {
    const response = await request.get('/api/brandsList')
    expect(response.status()).toBe(200)

    const body = await getJsonResponse<BrandsResponse>(response)
    expect(body.responseCode).toBe(200)
    expect(Array.isArray(body.brands)).toBe(true)
    expect(body.brands.length).toBeGreaterThan(0)
    expect(body.brands[0]).toMatchObject({
      id: expect.any(Number),
      brand: expect.any(String),
    })
  })

  test('PUT /api/brandsList returns 405 (negative)', async ({ request }) => {
    const response = await request.put('/api/brandsList')
    expect(response.status()).toBe(200)

    const body = await getJsonResponse<GenericMessageResponse>(response)
    expect(body).toEqual({
      responseCode: 405,
      message: 'This request method is not supported.',
    })
  })

  test('POST /api/searchProduct finds products by term (positive)', async ({ request }) => {
    const response = await request.post('/api/searchProduct', {
      form: {
        search_product: 'top',
      },
    })
    expect(response.status()).toBe(200)

    const body = await getJsonResponse<SearchProductsResponse>(response)
    expect(body.responseCode).toBe(200)
    expect(Array.isArray(body.products)).toBe(true)
    expect(body.products.length).toBeGreaterThan(0)
    for (const product of body.products) {
      expect(product).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        price: expect.any(String),
        brand: expect.any(String),
      })
    }
  })

  test('POST /api/searchProduct without search_product returns 400 (negative)', async ({ request }) => {
    const response = await request.post('/api/searchProduct', {
      form: {},
    })
    expect(response.status()).toBe(200)

    const body = await getJsonResponse<GenericMessageResponse>(response)
    expect(body).toEqual({
      responseCode: 400,
      message: 'Bad request, search_product parameter is missing in POST request.',
    })
  })

  test('POST /api/verifyLogin with invalid credentials returns not found (negative)', async ({ request }) => {
    const response = await request.post('/api/verifyLogin', {
      form: {
        email: 'not-existing-user@example.com',
        password: 'wrong-password',
      },
    })
    expect(response.status()).toBe(200)

    const body = await getJsonResponse<GenericMessageResponse>(response)
    expect(body).toEqual({
      responseCode: 404,
      message: 'User not found!',
    })
  })

  test('user lifecycle: create -> verify -> get details -> update -> delete (positive e2e)', async ({ request }) => {
    const user = makeUniqueUser()
    const createResponse = await request.post('/api/createAccount', {
      form: user,
    })
    expect(createResponse.status()).toBe(200)

    const createBody = await getJsonResponse<GenericMessageResponse>(createResponse)
    expect(createBody).toEqual({
      responseCode: 201,
      message: 'User created!',
    })

    const verifyResponse = await request.post('/api/verifyLogin', {
      form: {
        email: user.email,
        password: user.password,
      },
    })
    expect(verifyResponse.status()).toBe(200)

    const verifyBody = await getJsonResponse<GenericMessageResponse>(verifyResponse)
    expect(verifyBody).toEqual({
      responseCode: 200,
      message: 'User exists!',
    })

    const detailsResponse = await request.get('/api/getUserDetailByEmail', {
      params: {
        email: user.email,
      },
    })
    expect(detailsResponse.status()).toBe(200)

    const detailsBody = await getJsonResponse<UserDetailResponse>(detailsResponse)
    expect(detailsBody.responseCode).toBe(200)
    expect(detailsBody.user.email).toBe(user.email)
    expect(detailsBody.user.name).toBe(user.name)

    const updatedName = 'Oleh API Updated'
    const updateResponse = await request.put('/api/updateAccount', {
      form: {
        ...user,
        name: updatedName,
        city: 'NewCity',
      },
    })
    expect(updateResponse.status()).toBe(200)

    const updateBody = await getJsonResponse<GenericMessageResponse>(updateResponse)
    expect(updateBody).toEqual({
      responseCode: 200,
      message: 'User updated!',
    })

    const updatedDetailsResponse = await request.get('/api/getUserDetailByEmail', {
      params: {
        email: user.email,
      },
    })
    expect(updatedDetailsResponse.status()).toBe(200)

    const updatedDetailsBody = await getJsonResponse<UserDetailResponse>(updatedDetailsResponse)
    expect(updatedDetailsBody.responseCode).toBe(200)
    expect(updatedDetailsBody.user.email).toBe(user.email)
    expect(updatedDetailsBody.user.name).toBe(updatedName)

    const deleteResponse = await request.delete('/api/deleteAccount', {
      form: {
        email: user.email,
        password: user.password,
      },
    })
    expect(deleteResponse.status()).toBe(200)

    const deleteBody = await getJsonResponse<GenericMessageResponse>(deleteResponse)
    expect(deleteBody).toEqual({
      responseCode: 200,
      message: 'Account deleted!',
    })
  })

  test('user lifecycle negative: deleted user cannot login', async ({ request }) => {
    const user = makeUniqueUser()
    const createResponse = await request.post('/api/createAccount', {
      form: user,
    })

    const createBody = await getJsonResponse<GenericMessageResponse>(createResponse)
    expect(createBody).toEqual({
      responseCode: 201,
      message: 'User created!',
    })

    const deleteResponse = await request.delete('/api/deleteAccount', {
      form: {
        email: user.email,
        password: user.password,
      },
    })

    const deleteBody = await getJsonResponse<GenericMessageResponse>(deleteResponse)
    expect(deleteBody).toEqual({
      responseCode: 200,
      message: 'Account deleted!',
    })

    const loginResponse = await request.post('/api/verifyLogin', {
      form: {
        email: user.email,
        password: user.password,
      },
    })

    const loginBody = await getJsonResponse<GenericMessageResponse>(loginResponse)
    expect(loginBody).toEqual({
      responseCode: 404,
      message: 'User not found!',
    })
  })
})
