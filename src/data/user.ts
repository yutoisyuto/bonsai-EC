import { User, UserBonsai, MaintenanceRecord, OwnershipRecord, SellerInfo } from '@/types';
import { bonsaiData } from './bonsai';

export const sampleUser: User = {
  id: 'user-1',
  name: '田中 雅之',
  email: 'tanaka@example.com',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  memberSince: '2022-03-15',
  totalSpent: 12500000,
  favoriteSpecies: '松'
};

const maintenanceRecords: MaintenanceRecord[] = [
  {
    id: 'maintenance-1',
    date: '2024-12-20',
    type: 'watering',
    notes: '適度な水やりを実施。土の乾燥具合を確認。根の状態良好。',
    technician: '山田 匠',
    photos: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop']
  },
  {
    id: 'maintenance-2',
    date: '2024-12-15',
    type: 'pruning',
    notes: '新芽の剪定を行い、樹形を整えました。成長点の調整も実施。',
    technician: '山田 匠',
    photos: []
  },
  {
    id: 'maintenance-3',
    date: '2024-11-30',
    type: 'fertilizing',
    notes: '冬季用の肥料を施肥。根の健康状態良好。来春に向けた準備完了。',
    technician: '佐藤 雅',
    photos: []
  },
  {
    id: 'maintenance-4',
    date: '2024-11-15',
    type: 'inspection',
    notes: '月次健康診断実施。病気・害虫なし。全体的に良好な状態。',
    technician: '山田 匠',
    photos: []
  },
  {
    id: 'maintenance-5',
    date: '2024-10-20',
    type: 'watering',
    notes: '秋季の水管理調整。土の保湿状態をチェック。',
    technician: '佐藤 雅',
    photos: []
  }
];

const ownershipHistory1: OwnershipRecord[] = [
  {
    id: 'owner-1',
    ownerName: '京都盆栽園（創作者）',
    startDate: '1874-01-01',
    endDate: '1920-03-15',
    notes: '山田家三代目により育成開始。基本樹形を確立。'
  },
  {
    id: 'owner-2',
    ownerName: '松井 清太郎',
    startDate: '1920-03-15',
    endDate: '1965-08-20',
    purchasePrice: 50000, // 当時の価格
    notes: '戦前の盆栽愛好家。戦時中も大切に保護。'
  },
  {
    id: 'owner-3',
    ownerName: '神戸コレクション',
    startDate: '1965-08-20',
    endDate: '2010-12-10',
    purchasePrice: 800000,
    notes: '関西の名門コレクション。展示会で数々の賞を受賞。'
  },
  {
    id: 'owner-4',
    ownerName: '盆栽コレクターズ（仲介）',
    startDate: '2010-12-10',
    endDate: '2023-05-20',
    purchasePrice: 2200000,
    notes: '専門的な維持管理により価値向上。'
  },
  {
    id: 'owner-5',
    ownerName: '田中 雅之（現在）',
    startDate: '2023-05-20',
    purchasePrice: 2500000,
    notes: '現在の所有者。定期メンテナンスで良好な状態を維持。'
  }
];

const sellerInfo1: SellerInfo = {
  name: '京都古典盆栽商会',
  reputation: 4.8,
  totalSales: 156,
  memberSince: '2018-04-01',
  speciality: '松・古典樹形',
  location: '京都府京都市'
};

export const userBonsaiCollection: UserBonsai[] = [
  {
    id: 'user-bonsai-1',
    bonsai: bonsaiData[0], // 松の名品 - 雲龍
    purchaseDate: '2023-05-20',
    purchasePrice: 2500000,
    currentValue: 2750000,
    maintenanceRecords: maintenanceRecords,
    ownershipHistory: ownershipHistory1,
    sellerInfo: sellerInfo1
  },
  {
    id: 'user-bonsai-2',
    bonsai: bonsaiData[5], // 杉の森 - 千年 (sold状態)
    purchaseDate: '2022-08-10',
    purchasePrice: 7800000,
    currentValue: 8200000,
    maintenanceRecords: [
      {
        id: 'maintenance-6',
        date: '2024-12-18',
        type: 'inspection',
        notes: '年末の総合健康診断。樹勢良好、成長順調。300年の歴史を感じる迫力。',
        technician: '渡辺 千年',
        photos: []
      },
      {
        id: 'maintenance-7',
        date: '2024-12-01',
        type: 'repotting',
        notes: '3年ぶりの植え替え。根の整理と土の入れ替えを実施。古い根系の状態良好。',
        technician: '渡辺 千年',
        photos: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop']
      },
      {
        id: 'maintenance-8',
        date: '2024-11-15',
        type: 'pruning',
        notes: '冬季剪定。不要枝の除去と樹形調整。古木ならではの重厚感を維持。',
        technician: '渡辺 千年',
        photos: []
      }
    ],
    ownershipHistory: [
      {
        id: 'owner2-1',
        ownerName: '会津古材盆栽園',
        startDate: '1724-01-01',
        endDate: '1890-05-20',
        notes: '江戸時代から続く名園で300年間育成。会津藩主も鑑賞。'
      },
      {
        id: 'owner2-2',
        ownerName: '東北盆栽協会',
        startDate: '1890-05-20',
        endDate: '1980-03-15',
        purchasePrice: 200000,
        notes: '明治から昭和にかけて協会で管理。数々の展示会で最高賞受賞。'
      },
      {
        id: 'owner2-3',
        ownerName: '福島古典庭園',
        startDate: '1980-03-15',
        endDate: '2022-08-10',
        purchasePrice: 4500000,
        notes: '専門庭園での維持管理。樹勢回復と価値向上を実現。'
      },
      {
        id: 'owner2-4',
        ownerName: '田中 雅之（現在）',
        startDate: '2022-08-10',
        purchasePrice: 7800000,
        notes: '現在の所有者。専門職人による最高レベルの管理。'
      }
    ],
    sellerInfo: {
      name: '福島古典庭園',
      reputation: 4.9,
      totalSales: 89,
      memberSince: '2019-01-15',
      speciality: '古木・歴史的盆栽',
      location: '福島県会津若松市'
    }
  },
  {
    id: 'user-bonsai-3',
    bonsai: bonsaiData[1], // 楓の雅 - 紅葉
    purchaseDate: '2024-01-15',
    purchasePrice: 1800000,
    currentValue: 1900000,
    maintenanceRecords: [
      {
        id: 'maintenance-9',
        date: '2024-12-22',
        type: 'watering',
        notes: '冬季の水管理。土の表面が乾いたタイミングで実施。楓特有の繊細な根に配慮。',
        technician: '佐藤 雅',
        photos: []
      },
      {
        id: 'maintenance-10',
        date: '2024-11-25',
        type: 'fertilizing',
        notes: '紅葉後の栄養補給。来春の新芽形成に向けた準備。',
        technician: '佐藤 雅',
        photos: []
      },
      {
        id: 'maintenance-11',
        date: '2024-10-15',
        type: 'inspection',
        notes: '紅葉シーズンの健康チェック。美しい色づきを確認。',
        technician: '佐藤 雅',
        photos: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop']
      }
    ],
    ownershipHistory: [
      {
        id: 'owner3-1',
        ownerName: '東京盆栽工房',
        startDate: '1944-01-01',
        endDate: '2000-12-20',
        notes: '戦後復興期から平成まで。楓の特性を活かした育成。'
      },
      {
        id: 'owner3-2',
        ownerName: '六本木ガーデン',
        startDate: '2000-12-20',
        endDate: '2024-01-15',
        purchasePrice: 1500000,
        notes: '都市型庭園での管理。現代的な育成技術を導入。'
      },
      {
        id: 'owner3-3',
        ownerName: '田中 雅之（現在）',
        startDate: '2024-01-15',
        purchasePrice: 1800000,
        notes: '最新取得の楓。四季の美しさを楽しむ。'
      }
    ],
    sellerInfo: {
      name: '六本木ガーデン',
      reputation: 4.6,
      totalSales: 234,
      memberSince: '2020-06-01',
      speciality: '楓・現代盆栽',
      location: '東京都港区'
    }
  }
];
