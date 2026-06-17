import { useEffect, useState } from 'react'
import { useContractStore } from '../../store/contractStore'
import { ContractListContent } from './ContractListContent'
import { CreateContractModal } from './modals/CreateContractModal'
import { RenewContractModal } from './modals/RenewContractModal'
import { TerminateContractModal } from './modals/TerminateContractModal'
import { ViewContractModal } from './modals/ViewContractModal'
import type { ContractFrame, ContractRow } from './types'

function ActiveFrameOverlay({
  currentFrame,
  selectedContract,
  onClose,
}: {
  currentFrame: ContractFrame
  selectedContract: ContractRow | null
  onClose: () => void
}) {
  if (currentFrame === 'create') return <CreateContractModal onClose={onClose} />
  if (currentFrame === 'renew') return <RenewContractModal contract={selectedContract} onClose={onClose} />
  if (currentFrame === 'terminate') return <TerminateContractModal contract={selectedContract} onClose={onClose} />
  return null
}

export function ContractsView({ onBusyChange }: { onBusyChange?: (busy: boolean) => void }) {
  const { contracts } = useContractStore()
  const [currentContractFrame, setCurrentContractFrame] = useState<ContractFrame>('list')
  const [selectedContract, setSelectedContract] = useState<ContractRow | null>(null)
  const [viewedContract, setViewedContract] = useState<ContractRow | null>(null)
  const showContractOverlay = currentContractFrame !== 'list' || viewedContract !== null

  // Report whether an editing frame is open, so the shell can guard navigation.
  useEffect(() => {
    onBusyChange?.(currentContractFrame !== 'list')
    return () => onBusyChange?.(false)
  }, [currentContractFrame, onBusyChange])

  const openFrame = (frame: ContractFrame, contract?: ContractRow) => {
    setSelectedContract(contract ?? null)
    setCurrentContractFrame(frame)
  }

  const closeFrame = () => {
    setCurrentContractFrame('list')
    setSelectedContract(null)
  }

  return (
    <div className="relative min-h-[calc(100vh-58px)] overflow-hidden bg-white">
      <ContractListContent
        contracts={contracts}
        dimmed={showContractOverlay}
        onOpenFrame={openFrame}
        onViewContract={setViewedContract}
      />
      <ActiveFrameOverlay currentFrame={currentContractFrame} selectedContract={selectedContract} onClose={closeFrame} />
      {viewedContract ? <ViewContractModal contract={viewedContract} onClose={() => setViewedContract(null)} /> : null}
    </div>
  )
}
