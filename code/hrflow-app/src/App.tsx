import { useState } from 'react'
import { AppSidebar } from './components/layout/AppSidebar'
import { AppHeader } from './components/layout/AppHeader'
import { PlaceholderView } from './components/layout/PlaceholderView'
import { sidebarItems, type View } from './components/layout/navItems'
import { PersonnelProvider } from './store/personnelStore'
import { ContractProvider, useContractStore } from './store/contractStore'
import { PersonnelView } from './features/personnel/PersonnelView'
import { ContractsView } from './features/contracts/ContractsView'

function AppShell() {
  const [activeView, setActiveView] = useState<View>('ho-so')
  const [notificationOpen, setNotificationOpen] = useState(false)
  const { expiring } = useContractStore()

  const activeLabel = sidebarItems.find((item) => item.view === activeView)?.label ?? 'Hồ sơ nhân sự'

  const handleViewChange = (view: View) => {
    setActiveView(view)
    setNotificationOpen(false)
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
            <PersonnelView />
          ) : activeView === 'hop-dong' ? (
            <ContractsView />
          ) : (
            <PlaceholderView title={activeLabel} />
          )}
        </div>
      </div>
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
