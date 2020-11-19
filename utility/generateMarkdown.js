function generateMarkdown(userResponses, userInfo) {

  

  // Generate Table of Contents based on user input
  let draftToC = `## Table of Contents`;

  //Displays installation and link in in Table of Contents
  if (userResponses.installation !== '') 
  { 
    draftToC += `
    * [Installation](#installation)`; 
  };

  //Displays Usage and link in in Table of Contents
  if (userResponses.usage !== '')
  { 
    draftToC += `
    * [Usage](#usage)`; 
  };

  //Displays Contribute and link in in Table of Contents
  if (userResponses.contributing !== '') 
  { 
    draftToC += `
    * [Contributing](#contributing)`; 
  };

  //Displays Test and link in in Table of Contents
  if (userResponses.tests !== '') 
  { 
    draftToC += `
    * [Tests](#tests)`;
  };

   //Displays License and link in the Table of COntents
   if (userResponses.license !== '') 
   { 
     draftToC += `
    * [License](#license)`;
   };


  // Generates markdown with sections for Description, License,Installation, Usage, Contributing, Tests, and Questions
  let draftMarkdown = `
  # ${userResponses.title}
  
  ## Description 
  ${userResponses.description}
  `

  // Adds Table of Contents to the markdown
  draftMarkdown += draftToC;
 
  
  // Adds Installation section and how to install the files
  if (userResponses.installation !== '') 
  {
  draftMarkdown +=
 
  `
  ## Installation
  ${userResponses.installation}`
  };
  

  // Adds Usage section and how the project can be used
  if (userResponses.usage !== '') 
  {
  draftMarkdown +=

  `
  ## Usage 
  ${userResponses.usage}`
  };
  
  
  // Adds Contributing section and how to contribute to the project
  if (userResponses.contributing !== '') 
  {
    draftMarkdown +=
    
    `
  ## Contributing 
  ${userResponses.contributing}`
  };
  

  // Adds Tests section and testing details provided by the user
  if (userResponses.tests !== '') 
  {
    draftMarkdown +=
    `
  ## Tests 
  ${userResponses.tests}`
  };


  // Adds License section and user license selection 
  draftMarkdown +=
  `
  ## License
  ${userResponses.license}
  `;

  // Adds Questions section
  let draftDev = 
  ` 
  ## Questions
  Please contact me at the following email address if you have questions: ${userResponses.email}

  GitHub: [@${userInfo.login}](${userInfo.url}
  
  `;

  // If GitHub email is not null, add to Developer section
  if (userInfo.email !== null) {
  
  draftDev +=
  `
  Email: ${userInfo.email}
  `};

  // Add developer section to markdown
  draftMarkdown += draftDev;

  // Return markdown
  return draftMarkdown;
  
}

module.exports = generateMarkdown;