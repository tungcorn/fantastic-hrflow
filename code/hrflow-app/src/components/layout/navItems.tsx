import type { ReactNode } from 'react'
import { BarChart3, Building2, CircleUserRound, FileText, ShieldCheck } from 'lucide-react'

export type View = 'ho-so' | 'hop-dong' | 'co-cau' | 'luong-phu-cap' | 'tai-khoan'

export type SidebarItem = { id: string; view: View; label: string; icon: ReactNode }

export const sidebarItems: SidebarItem[] = [
  { id: 'ho-so', view: 'ho-so', label: 'Hồ sơ nhân sự', icon: <CircleUserRound size={17} /> },
  { id: 'hop-dong', view: 'hop-dong', label: 'Hợp đồng lao động', icon: <FileText size={17} /> },
  { id: 'co-cau', view: 'co-cau', label: 'Cơ cấu tổ chức', icon: <Building2 size={17} /> },
  { id: 'luong-phu-cap', view: 'luong-phu-cap', label: 'Phụ cấp và hệ số lương', icon: <BarChart3 size={17} /> },
  { id: 'tai-khoan', view: 'tai-khoan', label: 'Tài khoản', icon: <ShieldCheck size={17} /> },
]
