'use client'

import { Github, LogOut } from "lucide-react"
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

export default function AuthButton() {
    const { data: session, isPending } = useSession();

    if (isPending) {
        return (
            <div className="flex itmes-center gap-2 text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading...
            </div>
        )
    }

    const signInBtn = async () => {
        await signIn.social({
            provider: 'github'
        })
    };

    if (session?.user) {
        return (
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                        <AvatarImage
                            src={session.user.image || ""}
                            alt={session.user.name || "User"}
                        />
                        <AvatarFallback>{session.user.name?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">
                        {session.user.name || session.user.email}
                    </span>
                </div>
                <Button variant="outline" size="sm" onClick={() => signOut()}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                </Button>
            </div>
        );
    }

    return (
        <Button onClick={signInBtn}>
            <Github className="w-4 h-4 mr-2" />
            Sign in with GitHub
        </Button>
    )
}