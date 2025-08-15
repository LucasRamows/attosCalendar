import { AlertCircleIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"

interface ErrorPopUpProps {
  error: boolean
}

const ErrorPopUp = ({ error }: ErrorPopUpProps) => {
  return (
    <div className="flex items-center justify-center">
      {error ? (
        <Alert className="w-full bg-red-100 text-red-800">
          <AlertCircleIcon />
          <AlertTitle>Erro!</AlertTitle>
          <AlertDescription>
            Tivemos um problema, verifique as informações
            e tente novamente, ou saia e entre novamente no site.
          </AlertDescription>
        </Alert>
      ) : null}
    </div>
  )
}

export default ErrorPopUp
