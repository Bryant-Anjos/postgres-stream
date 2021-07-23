import supertest from 'supertest'

import app from '../../src/index'

test('Shoud connect correctly', async () => {
  const api = supertest(app)
  const response = await api.get('/')
  expect(response.status).toBe(200)
  expect(response.body).toEqual({ ok: true })
})
