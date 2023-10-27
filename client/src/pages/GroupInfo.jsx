import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AvatarBig } from "../components/AvatarBig";
import { AvatarSmall } from "../components/AvatarSmall";
import { Layout } from "../components/Layout";
import { Link } from "react-router-dom";


export const GroupInfo = () => {
  const [group, setGroup] = useState();
  const { id } = useParams();

  const fetchGroup = async () => {
    // https://textera-production.up.railway.app/user/
    const req = await fetch('http://localhost:3000/group/' + id);
    const res = await req.json()
    setGroup(res);
  }

  useEffect(() => {
    fetchGroup();
  }, [])

  if (!group) {
    return (
        <Layout>
          <div>
            Loading...
          </div>
        </Layout>
    )
  }

  return (
      <Layout>
        <div className="content user-profile">
          <AvatarBig imageUrl={group.image} />
          <div className="user_name">{group.title}</div>
          <div>
            {group.users.length} users
            {
              group.users.map((el) => {
                return (
                  <Link to={`/user/${el._id}`}>
                    <AvatarSmall imageUrl={el.avatar} />
                    <div>
                      {el.username}
                    </div>
                  </Link>
                  
                )
              })
            }
          </div>
        </div>
      </Layout>
  )
}