import { EditorElement } from '@/types/pageEditor';
import React from 'react'
import { TeamSectionContent } from '.';
import { getTeamSection } from '@/actions/appwrite';
import MemberCard from '@/components/ui/member-card';
import { memberStorage } from '@/types/database/member';
import { database } from '@/lib/appwrite';

type Props = {
  element: EditorElement<TeamSectionContent>;
}

export default  function teamSeactionComponenta({ element }: Props) {
  const { title } = element.content
  const [members, setMembers] = React.useState<memberStorage[]>()

  React.useEffect(() => {
    
    const fetchMembers = async () => {
      const members = await database.listDocuments<memberStorage>("658fabb7b076a84d06d2", "65b88761559a4aa41f38");
      setMembers(members.documents)
    }
    fetchMembers()
  }, [])



  return (
 
        <div className="neoh_fn_team">
          <ul className="team_list">
            {members &&
              members.map((member) => (
                <li className="team_item" key={member.$id}>
                  <MemberCard key={member.$id} socials={member.socialMedia} name={member.name} description={member.description} img={member.image} />
                </li>
              ))}
          </ul>
        </div>
 
  )
}
