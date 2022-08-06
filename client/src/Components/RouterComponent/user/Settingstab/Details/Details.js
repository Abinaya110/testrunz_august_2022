import React from 'react'
import { useStateValue } from '../../../../../data/StateProvider' 
import Detailsadmin from './Detailsadmin';
import Detailssuperadmin from './Detailssuperadmin';
import Detailsteacher from './Detailsteacher';

const Details = () => {
  const [{ user }, dispatch] = useStateValue();
  const role= user.role
  
  
  
  return (
    <div>
      {role==="admin" && <Detailsadmin/>}
      {role==="superadmin" && <Detailssuperadmin/>}
      {role==="teacher" && <Detailsteacher/>}
    </div>
  )
}

export default Details