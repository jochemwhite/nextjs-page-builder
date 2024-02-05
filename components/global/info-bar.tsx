"use client";
import { NotificationWithUser } from "@/lib/types";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Bell } from "lucide-react";
import { Role } from "@prisma/client";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "./model-toggle";

interface InfoBarProps {
  notifications: NotificationWithUser | [];
  role?: Role;
  className?: string;
  subAccountId?: string;
}
export const InfoBar = ({
  notifications,
  subAccountId,
  className,
  role,
}: InfoBarProps) => {
  const [allNotifications, setAllNotifications] = useState(notifications);
  const [showAll, setShowAll] = useState(true);
  const handleCLick = () => {
    if (!showAll) {
      setAllNotifications(notifications);
    } else {
      if (notifications?.length == 0) {
        setAllNotifications(
          notifications?.filter((item) => item.subAccountId === subAccountId) ??
            []
        );
      }
    }
    setShowAll((prev) => !prev);
  };
  return (
    <>
      <div
        className={cn(
          "fixed z-[20] md:left-[300px] left-0 right-0 top-0 p-4 bg-background/80 backdrop-blur-md flex gap-4 items-center border-b-[1px]",
          className
        )}
      >
        <div className="flex items-center gap-2 ml-auto">
          <UserButton afterSignOutUrl="/" />
          <Sheet>
            <SheetTrigger>
              <div className="rounded-full size-9 bg-primary flex items-center justify-center text-white">
                <Bell size={17} />
              </div>
            </SheetTrigger>
            <SheetContent className="mt-4 mr-4 pr-4 overflow-scroll">
              <SheetHeader className="text-left">
                <SheetTitle>Notifications</SheetTitle>
                <SheetDescription>
                  {role === "AGENCY_ADMIN" ||
                    (role == "AGENCY_OWNER" && (
                      <Card className="flex items-center justify-between p-4">
                        Current Subaccount
                        <Switch onCheckedChange={handleCLick} />
                      </Card>
                    ))}
                </SheetDescription>
              </SheetHeader>
              {allNotifications?.map((not) => (
                <div
                  key={not.id}
                  className=" flex flex-col gap-y-2 mb-2 overflow-x-scroll text-ellipsis"
                >
                  <div className="flex gap-2">
                    <Avatar>
                      <AvatarImage
                        src={not.User.avatarUrl}
                        alt="Profile Picture"
                      />
                      <AvatarFallback className="bg-primary">
                        {not.User.name.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p>
                        <span className="font-bold">
                          {not.notification.split("|")[0]}
                        </span>
                        <span className="text-muted-foreground">
                          {not.notification.split("|")[1]}
                        </span>
                        <span className="font-bold">
                          {not.notification.split("|")[2]}
                        </span>
                      </p>
                      <small className="text-xs text-muted-foreground ">
                        {new Date(not.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
              {allNotifications?.length == 0 && (
                <div className="flex items-center justify-center mb-4">
                  You have no notifications
                </div>
              )}
            </SheetContent>
          </Sheet>
          <ModeToggle />
        </div>
      </div>
    </>
  );
};
