import { useEffect, useState } from 'react'
import { useContractStore } from '../../store/contractStore'
import { ContractListContent } from './ContractListContent'
import { CreateContractModal } from './modals/CreateContractModal'
import { RenewContractModal } from './modals/RenewContractModal'
import { TerminateContractModal } from './modals/TerminateContractModal'
import { ViewContractModal } from './modals/ViewContractModal'
import { SuccessDialog } from '../../components/ui/SuccessDialog'
import type { ContractFrame, ContractRow, ContractSuccess } from './types'

function ActiveFrameOverlay({
  currentFrame,
  selectedContract,
  onClose,
  onSuccess,
}: {
  currentFrame: ContractFrame
  selectedContract: ContractRow | null
  onClose: () => void
  onSuccess: (success: ContractSuccess) => void
}) {
  if (currentFrame === 'create') return <CreateContractModal onClose={onClose} onSuccess={onSuccess} />
  if (currentFrame === 'renew')
    return <RenewContractModal contract={selectedContract} onClose={onClose} onSuccess={onSuccess} />
  if (currentFrame === 'terminate') return <TerminateContractModal contract={selectedContract} onClose={onClose} />
  return null
}

export function ContractsView({ onBusyChange }: { onBusyChange?: (busy: boolean) => void }) {
  const { contracts } = useContractStore()
  const [currentContractFrame, setCurrentContractFrame] = useState<ContractFrame>('list')
  const [selectedContract, setSelectedContract] = useState<ContractRow | null>(null)
  const [viewedContract, setViewedContract] = useState<ContractRow | null>(null)
  const [success, setSuccess] = useState<ContractSuccess | null>(null)
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

  // Close the active modal and surface the success dialog over the list.
  const handleSuccess = (info: ContractSuccess) => {
    closeFrame()
    setSuccess(info)
  }

  return (
    <div className="relative min-h-[calc(100vh-58px)] overflow-hidden bg-white">
      <ContractListContent
        contracts={contracts}
        dimmed={showContractOverlay}
        onOpenFrame={openFrame}
        onViewContract={setViewedContract}
      />
      <ActiveFrameOverlay
        currentFrame={currentContractFrame}
        selectedContract={selectedContract}
        onClose={closeFrame}
        onSuccess={handleSuccess}
      />
      {viewedContract ? <ViewContractModal contract={viewedContract} onClose={() => setViewedContract(null)} /> : null}
      {success ? (
        <SuccessDialog
          title={success.title}
          description={success.description}
          highlightLabel={success.highlightLabel}
          highlightValue={success.highlightValue}
          onConfirm={() => setSuccess(null)}
        />
      ) : null}
    </div>
  )
}
