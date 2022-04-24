import { DefaultImg } from '../components/DefaultImg';
import Container from '@mui/material/Container';
// IMG
import Faultier from '../img/Faultier.jpeg';
import Fussball from '../img/Fussball.jpeg';
import Telephone from '../img/Telephone.jpeg';
import Fish from '../img/fish.jpeg';
import Ente from '../img/Ente.jpeg';
import Katze from '../img/katze.jpeg';
import Mountain from '../img/Mountain.jpeg';
import Native from '../img/Native.jpeg';
import Rocket from '../img/Rocket.jpeg';
import Tree from '../img/Tree.jpeg';
import Crowd from '../img/Crowd.jpeg';
import Hand from '../img/Hand.jpeg';

export function ImageRows(props: any){

    return(
       <div>
        <Container sx={{display: "flex",justifyContent: "center"}}>
          <DefaultImg handler={props.handler} alt="Faultier" url={Faultier}/>
          <DefaultImg handler={props.handler} alt="Fussball" url={Fussball}/>
          <DefaultImg handler={props.handler} alt="Telephone" url={Telephone}/>
          <DefaultImg handler={props.handler} alt="Fish" url={Fish}/>
          <DefaultImg handler={props.handler} alt="Ente" url={Ente}/>
          <DefaultImg handler={props.handler} alt="Katze" url={Katze}/>
        </Container>

        <Container sx={{display: "flex",justifyContent: "center"}}>
          <DefaultImg handler={props.handler} alt="Rocket" url={Rocket}/>
          <DefaultImg handler={props.handler} alt="Tree" url={Tree}/>
          <DefaultImg handler={props.handler} alt="Native" url={Native}/>
          <DefaultImg handler={props.handler} alt="Crowd" url={Crowd}/>
          <DefaultImg handler={props.handler} alt="Mountain" url={Mountain}/>
          <DefaultImg handler={props.handler} alt="Hand" url={Hand}/>
        </Container>
       </div>
    )
}
