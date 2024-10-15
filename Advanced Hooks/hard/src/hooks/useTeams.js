import { useState, useEffect } from "react";

export const useTeams = (initialState) => {
    const [teams, setTeams] = useState(initialState);
  
    useEffect(() => {
      const teams = ["AC Milan","Arsenal FC","Real Madrid CF","FC Bayern München","IFK Göteborg"];
      setTeams(teams);
    }, []);
  
  
    return [teams, setTeams];
  };