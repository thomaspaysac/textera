import { useState, useEffect, useContext } from "react";
import { userContext } from "../App";
import { Layout } from "../components/Layout";
import { GroupOverview } from "../components/GroupOverview";
import { NewConvButton } from "../components/NewConvButton";

export const GroupsList = () => {
  const [groups, setGroups] = useState();
  const userData = useContext(userContext);

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
    if (!userData) {
      return
    }
    const req = await fetch('http://localhost:3000/group/user/' + userData.user_metadata.uid, {
      headers: {
        "Authorization": userData.user_metadata.uid,
      }
    });
    //const req = await fetch('https://textera-production.up.railway.app/group/user/' + localStorage.user_id);
    const res = await req.json()
    setGroups(res);
  }

  useEffect(() => {
    fetchGroups()
  }, [userData])

  if (!groups) {
    return (
      <>
      <Layout>
        <h2>Groups</h2>
        <div>No group</div>
        <NewConvButton link={'/group/create'} />
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