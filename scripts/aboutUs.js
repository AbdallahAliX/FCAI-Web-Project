import { teamMembers } from "./data.js";

const teamMembersContainer = document.getElementById("team-members");

const renderMembers = (members) => {
  members.map((member) => {
    const memberCard = document.createElement("div"); // Changed variable name to memberCard
    memberCard.classList.add("card");
    memberCard.innerHTML = `
        
        <img class="card-img" src="${member.photo}" alt="${member.name}">
        <h3>${member.name}</h3>
        ${
          member.github
            ? `<a href="${member.github}" target="_blank"><img class="card-icon" width="35" height="35" src="https://img.icons8.com/fluency/240/github.png" alt="github"/></a>`
            : ""
        }
        ${
          member.linkedin
            ? `<a href="${member.linkedin}" target="_blank"><img class="card-icon" width="35" height="35" src="https://img.icons8.com/fluency/48/linkedin.png" alt="linkedin"/></a>`
            : ""
        }
        ${
          member.upwork
            ? `<a href="${member.upwork}" target="_blank"><img width="35" height="35" src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/48/external-upwork-a-global-freelancing-platform-where-professionals-connect-and-collaborate-remotely-logo-shadow-tal-revivo.png" alt="external-upwork-a-global-freelancing-platform-where-professionals-connect-and-collaborate-remotely-logo-shadow-tal-revivo"/></a>`
            : ""
        }
        
    `;
    teamMembersContainer.appendChild(memberCard);
  });
};

window.onload = () => renderMembers(teamMembers);
