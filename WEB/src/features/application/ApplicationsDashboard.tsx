import AddApplication from "./AddApplication";
import ApplicationsList from "./ApplicationsList";
import ApplicationStats from "./ApplicationStats";

export default function ApplicationsDashboard() {
  return (
    <div>
        <AddApplication/>
        <ApplicationsList/>    
        <ApplicationStats/>

    </div>
  )
}