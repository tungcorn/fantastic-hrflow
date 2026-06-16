import { useState } from 'react'
import { useContractStore } from '../../store/contractStore'
import { ContractListContent } from './ContractListContent'
import { CreateContractModal } from './modals/CreateContractModal'
import { RenewContractModal } from './modals/RenewContractModal'
import { TerminateContractModal } from './modals/TerminateContractModal'
import { ViewContractModal } from './modals/ViewContractModal'
import type { ContractFrame, ContractRow } from './types'

function ActiveFrameOverlay({ currentFrame, onClose }: { currentFrame: ContractFrame; onClose: () => void }) {
  if (currentFrame === 'create') return <CreateContractModal onClose={onClose} />
  if (currentFrame === 'renew') return <RenewContractModal onClose={onClose} />
  if (currentFrame === 'terminate') return <TerminateContractModal onClose={onClose} />
  return null
}

export function ContractsView() {
  const { contracts } = useContractStore()
  const [currentContractFrame, setCurrentContractFrame] = useState<ContractFrame>('list')
  const [viewedContract, setViewedContract] = useState<ContractRow | null>(null)
  const showContractOverlay = currentContractFrame !== 'list' || viewedContract !== null

  return (
    <div className="relative min-h-[calc(100vh-58px)] overflow-hidden bg-white">
      <ContractListContent
        contracts={contracts}
        dimmed={showContractOverlay}
        onOpenFrame={setCurrentContractFrame}
        onViewContract={setViewedContract}
      />
      <ActiveFrameOverlay currentFrame={currentContractFrame} onClose={() => setCurrentContractFrame('list')} />
      {viewedContract ? <ViewContractModal contract={viewedContract} onClose={() => setViewedContract(null)} /> : null}
    </div>
  )
}
