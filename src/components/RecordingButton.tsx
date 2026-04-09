import { Mic } from "lucide-react"
import { IconButton } from "./core"
import { Spinner } from "./IconComponents"

const micClasses = 'bg-voca-recording text-white hover:bg-voca-recording/90 rounded-full'

interface RecordingButtonProps {
  loading?: boolean
  disabled?: boolean
}

export const RecordingButton = ({ loading = false, disabled = false}: RecordingButtonProps) => {
  return (
    <IconButton className={micClasses} loading={loading} disabled={disabled}>
        {loading ? <Spinner size={24} className="me-0" /> : <Mic className="w-6 h-6" />}
    </IconButton>
  )
}
