import React, { useContext } from 'react';
import { Typography, Button } from '@material-ui/core';
import DappContext from "../Context/DappContext";
import Link from 'next/link';
import ReportIcon from '@material-ui/icons/Report';

const RequireSetProject = props => {

  const { selectedProject, projects } = useContext(DappContext);

  if (projects == null || projects[selectedProject] == null) {
    if (props.customWarning != null) return props.customWarning;
    else {
      return (
        <section style={{ width: "100%", height: "500px" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
            <div>
              <Typography variant="h1" style={{ textAlign: "center" }}>Woah There!</Typography>
              <Typography variant="h4">You're going to need a selected project to do that.</Typography>
              <ReportIcon style={{ margin: "auto", width: "100%", marginTop: "12px", marginBottom: "12px", height:"150px" }} />
              <Link href="projects" >
                <Button color="primary" variant="contained" style={{ margin: "auto", width: "100%", display: "block" }}>
                  Go to Projects
                </Button>
              </Link>
            </div>
          </div>
        </section>
      );
    }
  }
  else return props.children;
};

export default RequireSetProject;