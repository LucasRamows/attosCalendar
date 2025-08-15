import { CheckCircle2Icon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"

interface SuccessPopUpProps {
  success: boolean
}

const SuccessPopUp = ({ success }: SuccessPopUpProps) => {
  return (
    <div className="flex items-center justify-center">
      {success ? (
        <Alert className="w-full bg-green-100 text-green-800">
          <CheckCircle2Icon />
          <AlertTitle>Sucesso!</AlertTitle>
          <AlertDescription>
            A sua tarefa foi criada com sucesso.
          </AlertDescription>
        </Alert>
      ) : null}
    </div>
  )
}

export default SuccessPopUp
