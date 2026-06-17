import { useCallback, useRef, useState } from 'react'
import { AppSidebar } from './components/layout/AppSidebar'
import { AppHeader } from './components/layout/AppHeader'
import { PlaceholderView } from './components/layout/PlaceholderView'
import { ConfirmDialog } from './components/ui/ConfirmDialog'
import { sidebarItems, type View } from './components/layout/navItems'
import { PersonnelProvider } from './store/personnelStore'
import { ContractProvider, useContractStore } from './store/contractStore'
import { PersonnelView } from './features/personnel/PersonnelView'
import { ContractsView } from './features/contracts/ContractsView'

function AppShell() {
  const [activeView, setActiveView] = useState<View>('ho-so')
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [pendingView, setPendingView] = useState<View | null>(null)
  const { expiring } = useContractStore()

  // The active feature view reports here when it has an open form/dialog with
  // unsaved input. We keep it in a ref so navigation handlers can read it
  // synchronously without extra re-renders.
  const busyRef = useRef(false)
  const setBusy = useCallback((busy: boolean) => {
    busyRef.current = busy
  }, [])

  const activeLabel = sidebarItems.find((item) => item.view === activeView)?.label ?? 'Hồ sơ nhân sự'

  const goToView = (view: View) => {
    setActiveView(view)
    setNotificationOpen(false)
  }

  const handleViewChange = (view: View) => {
    if (view === activeView) return
    if (busyRef.current) {
      setPendingView(view)
      return
    }
    goToView(view)
  }

  const confirmLeave = () => {
    if (pendingView) goToView(pendingView)
    setPendingView(null)
  }

  return (
    <div className="min-h-screen bg-white font-['Be_Vietnam_Pro'] text-slate-900">
      <div className="flex min-h-screen overflow-hidden bg-white">
        <AppSidebar activeView={activeView} onViewChange={handleViewChange} />
        <div className="min-w-0 flex-1 bg-slate-50">
          <AppHeader
            label={activeLabel}
            notifications={expiring}
            notificationOpen={notificationOpen}
            onToggleNotifications={() => setNotificationOpen((open) => !open)}
          />
          {activeView === 'ho-so' ? (
            <PersonnelView onBusyChange={setBusy} />
          ) : activeView === 'hop-dong' ? (
            <ContractsView onBusyChange={setBusy} />
          ) : (
            <PlaceholderView title={activeLabel} />
          )}
        </div>
      </div>

      {pendingView ? (
        <ConfirmDialog
          title="Rời khỏi trang khi chưa lưu?"
          description="Bạn đang có thông tin chưa lưu trong biểu mẫu. Nếu chuyển trang, các thay đổi chưa lưu sẽ bị mất."
          confirmLabel="Rời khỏi"
          cancelLabel="Ở lại"
          danger
          onConfirm={confirmLeave}
          onCancel={() => setPendingView(null)}
        />
      ) : null}
    </div>
  )
}

export default function App() {
  return (
    <PersonnelProvider>
      <ContractProvider>
        <AppShell />
      </ContractProvider>
    </PersonnelProvider>
  )
}
