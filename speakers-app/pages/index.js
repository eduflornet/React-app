import { data } from "../SpeakerData";
import Speaker from "../src/components/Speakers/Speakers";

const IndexPage = () => {

  

  return (
    <div className="container speakers-list">
      <div className="row">
      
        
        {data.map(function (speaker) {
          if(speaker){
            return <Speaker key={speaker?.id} speaker={speaker} />;
          }
          
        })}
      </div>
    </div>
  );
};

export default IndexPage;