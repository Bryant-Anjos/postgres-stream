import { Router } from 'express'
import fs from 'fs'
import path from 'path'
import { Transform } from 'stream'
import Stringify from 'streaming-json-stringify'

import db from './database'

type CountableTransform = Transform & Record<'counter', number>

const router = Router()

const writableMapToCSV = new Transform({
  transform(chunk, encoding, cb) {
    ;(this as CountableTransform).counter =
      (this as CountableTransform).counter ?? 0

    try {
      const string = chunk.toString('utf8')
      const data = JSON.parse(string)
      const headers =
        (this as CountableTransform).counter === 0
          ? `${Object.keys(data).join(',')}\n`
          : ''
      const row = `${headers}${Object.values(data).join(',')}\n`
      ;(this as CountableTransform).counter += 1
      cb(null, row)
    } catch (err) {
      cb(null, '')
    }
  },
})

router.get('/', (req, res) => {
  res.json({ ok: true })
})

router.get('/sales', async (req, res) => {
  const response = await db.select('*').from('sales').limit(10)

  res.json(response)
})

router.get('/sales/export', async (req, res) => {
  const csv = path.join(__dirname, 'out.csv')
  const ws = fs.createWriteStream(csv, { encoding: 'utf8' })
  const sales = db.select('*').from('sales').stream()

  sales
    .pipe(Stringify())
    .pipe(writableMapToCSV)
    .pipe(ws)
    .on('close', () => {
      res.type('text/csv; charset=utf-8')
      res.attachment(path.basename(csv)).sendFile(csv)
    })
    .on('error', (error) => {
      res.json({ error })
    })
})

router.get('/sales/download', async (req, res) => {
  res.type('text/csv; charset=utf-8')
  res.attachment(path.basename('out.csv'))

  const sales = db.select('*').from('sales').stream()

  sales
    .pipe(Stringify())
    .pipe(writableMapToCSV)
    .pipe(res)
    .on('error', (error) => {
      res.json({ error })
    })
})

export default router
