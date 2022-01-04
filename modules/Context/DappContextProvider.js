import React, { useEffect, useState } from 'react';
import DappContext from './DappContext';

const DappContextProvider = ({ children }) => {
  // TODO: remove default values
  const [projects, setProjects] = useState([
    {
      id: 0,
      name: 'Project 1',
      image: 'https://play-lh.googleusercontent.com/10axL9ZMum2LZmCsVutZwvwfx0bkYhB-G7c12Qvl1xDexMYxcqwILCYNgnzzcSDbLrAw=s180-rw'
    },    
    {
      id: 1,
      name: 'Project 2',
      image: 'https://play-lh.googleusercontent.com/-meRETSTUS8DBtnim75eGwlTPncfiUpR5zAiSl3hu5NnuETVmYA4Fk-vIUBVWdd-ynw=s180-rw'
    },
  ]);
  const [selectedProject, setSelectedProject] = useState(0);

  const contextValue = React.useMemo(() => {
    return {
      projects,
      setProjects,
      selectedProject,
      setSelectedProject
    };
  }, [projects]);

  return <DappContext.Provider value={contextValue}>{children}</DappContext.Provider>;
};


export default DappContextProvider;
