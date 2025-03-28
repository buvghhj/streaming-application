import "@/styles/globals.css";
import { PropsWithChildren } from "react";
import Header from "@/components/layout/header/Header";
import LayoutContainer from "@/components/layout/LayoutContainer";
import Sidebar from "@/components/layout/sidebar/Sidebar";

export default async function SiteLayout({ children }: PropsWithChildren<unknown>) {

    return (

        <div className="flex h-full flex-col">

            <div className="flex-1">

                <div className="fixed inset-y-0 z-50 h-[75px] w-full">

                    <Header />

                </div>

                <Sidebar />

                <LayoutContainer>

                    {children}

                </LayoutContainer>

            </div>

        </div>

    )

}
