import Unauthorized from "@/components/unauthorized";
import { getAuthUserDetails, verifyAndAcceptInvitation } from "@/lib/querys";
import { redirect } from "next/navigation";

type Props = {
  params: {
    subaccountId: string;
  };
  searchParms: {
    state: string;
    code: string;
  };
};
export default async function SubAccountId({ params, searchParms }: Props) {
  const agencyId = await verifyAndAcceptInvitation();
  if (!agencyId) {
    return <Unauthorized />;
  }
  const user = await getAuthUserDetails();
  if (!user) return null;
  const getFirstSubaccountWithAcess = user.Permissions.find((p) => p.access);
  if (searchParms?.state) {
    const statePath = searchParms.state.split("___")[0];
    const stateSubaccountId = searchParms.state.split("___")[1];
    if (!stateSubaccountId) {
      return <Unauthorized />;
    }
    return redirect(
      `/subaccount/${stateSubaccountId}/${statePath}?code=${searchParms.code}`
    );
  }
  if (getFirstSubaccountWithAcess) {
    return redirect(`/subaccount/${getFirstSubaccountWithAcess.subAccountId}`);
  }
  return <Unauthorized />;
}
