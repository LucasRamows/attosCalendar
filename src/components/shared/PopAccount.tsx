import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import api from "@/services/api";
import { LogOut, User } from "lucide-react";
import { useState } from "react";
import ErrorPopUp from "./ErrorPopUp";
import { useNavigate } from "react-router-dom";


export function PopAccount() {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const [error, setError] = useState(false);
    const navigate = useNavigate();


    const editHandleSubmit = async () => {


    };

    const deleteHandleSubmit = async () => {
        try {
            await api.delete("/self-delete",
                { headers: { Authorization: "Bearer " + token } }
            );
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/sign-in");

        } catch (error) {
            setError(true);
            console.error("Error deleting account:", error);
        }
    }

    const logoutHandleSubmit = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/sign-in");
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline"><User /></Button>
            </PopoverTrigger>
            <PopoverContent className="w-60">
                <div className="grid gap-4">
                    <div className="space-y-2 flex justify-between">
                        <h4 className="leading-none font-medium">Olá {user.name}</h4>
                        <p className="text-[10px]">{user.role}</p>
                    </div>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="width">Ações:</Label>
                        </div>
                        <Button variant="default" onClick={() => editHandleSubmit()} type="submit">
                            Alterar Dados
                        </Button>
                        <Button variant="destructive" onClick={() => deleteHandleSubmit()} type="submit">
                            Deletar Conta
                        </Button>
                        <Button variant="outline" className="bg-red-500" onClick={() => logoutHandleSubmit()} type="submit">
                            <LogOut />
                        </Button>
                        <ErrorPopUp error={error} />
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
