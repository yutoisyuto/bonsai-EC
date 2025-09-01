import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '盆栽コレクターズ - 匠が手掛けた盆栽アートを集める',
  description: '世界最高の庭園の盆栽にアクセスし、あなたのためだけのお手入れサービスで遺産継承を。',
  keywords: '盆栽, コレクション, 日本庭園, 盆栽アート, 投資',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
