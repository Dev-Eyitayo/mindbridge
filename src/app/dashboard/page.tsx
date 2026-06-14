import DashboardPage from "./[sessionId]/page";

export default function NewDashboardPage() {

  const params = Promise.resolve({ sessionId: "new" });
  
  return <DashboardPage params={params} />;
}