import { getAuthUserDetails } from "@/lib/querys";
import { MenuOptions } from "./menu-options";

type Props = {
  id: string;
  type: "agency" | "subaccount";
};

export default async function Sidebar({ id, type }: Props) {
  const user = await getAuthUserDetails();
  if (!user) {
    return null;
  }
  if (!user.Agency) {
    return null;
  }

  const details =
    type === "agency"
      ? user?.Agency
      : user?.Agency.SubAccount.find((sub: any) => sub.id === id);

  const isWhiteLabeledAgency = user.Agency.whiteLabel;
  if (!details) return null;

  let sidebarLogo = user.Agency.agencyLogo ?? "/assets/plura-logo";
  if (!isWhiteLabeledAgency) {
    if (type === "subaccount") {
      sidebarLogo =
        user?.Agency.SubAccount.find((sub: any) => sub.id === id)
          ?.subAccountLogo ?? user.Agency.agencyLogo;
    }
  }

  const sidebarOpt =
    type === "agency"
      ? user.Agency.SidebarOption ?? []
      : user.Agency.SubAccount.find((sub: any) => sub.id === id)
          ?.SidebarOption ?? [];

  const subaccounts = user.Agency.SubAccount.filter((sub: any) =>
    user.Permissions.find(
      (per: any) => per.subAccountId === sub.id && per.access
    )
  );

  return (
    <>
      <MenuOptions
        defaultOpen={true}
        details={details}
        id={id}
        sidebarLogo={sidebarLogo}
        sidebarOpt={sidebarOpt}
        subAccounts={subaccounts}
        user={user}
      />
      <MenuOptions
        details={details}
        id={id}
        sidebarLogo={sidebarLogo}
        sidebarOpt={sidebarOpt}
        subAccounts={subaccounts}
        user={user}
      />
    </>
  );
}
