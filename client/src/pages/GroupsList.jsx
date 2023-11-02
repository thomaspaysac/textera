import { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import { GroupOverview } from "../components/GroupOverview";
import { NewConvButton } from "../components/NewConvButton";

export const GroupsList = () => {
  const [groups, setGroups] = useState();

  const groupsList = () => {
    return(
      <>
        {
          groups.map((el) => {
            return (
              <GroupOverview key={el._id} group={el} />
            )
          })
        }
      </>
    )
  }

  const fetchGroups = async () => {
    //const req = await fetch('http://localhost:3000/group/user/' + localStorage.user_id);
    const req = await fetch('https://textera-production.up.railway.app/group/user/' + localStorage.user_id);
    const res = await req.json()
    setGroups(res);
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  if (!groups) {
    return (
      <>
      <Layout>
        <h2>Groups</h2>
        <div>No group</div>
        <NewConvButton link={'/newgroup'} />
      </Layout>
    </>
    )
  }

  return (
    <>
      <Layout>
        <div className="content groups-list">
          {groupsList()}
        </div>
        <NewConvButton link={'/group/create'} />
      </Layout>
    </>
  )
}