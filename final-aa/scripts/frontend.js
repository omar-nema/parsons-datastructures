window.addEventListener('load', async () => {
  function initMap() {
    let map = L.map('map').setView([40.747, -73.988], 12);
    let osmLayer = L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png',
      {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }
    ).addTo(map);
    return map;
  }

  async function getData() {
    let meetingsRaw = await fetch('http://localhost:3000/meetings');
    let meetings = await meetingsRaw.json();

    let groupsRaw = await fetch('http://localhost:3000/groups');
    let groups = await groupsRaw.json();

    return {
      groups: groups,
      meetings: meetings,
    };
  }

  function getMeetingsForGroup(groupId, meetingsData) {
    return meetingsData.filter((d) => d.groupid == groupId);
  }

  function populateMap(groups, meetings) {
    groups.forEach((d) => {
      let grpMeetings = getMeetingsForGroup(d.id, meetings);

      let circle = L.circle([d.latitude, d.long], {
        color: 'red',
        fillColor: '#000000',
        strokeColor: 'black',
        radius: 50,
      }).addTo(map);

      let details = '';
      if (d.accessibility) {
        details = 'Accessible';
      } else {
        details = 'Accessibility not known';
      }
      if (d.details !== 'null') {
        details += ', ' + d.details;
      }

      let meetingString = '';
      grpMeetings.forEach((d, i) => {
        meetingString += `
          <p>
          
          ${d.meetingtype} meeting
          <br>
          ${d.day} from ${d.starttime} to ${d.endtime}
          </p>
          `;
      });

      let html = `
        <h3>${d.groupname}</h3>
        <p><span class="pre">Address: </span> ${d.location} at ${d.buildingname}</p>
        <p><span class="pre">Details: </span> ${details} </p>
        <span class="pre">Meetings: </span><br>
        ${meetingString}
      `;

      circle.bindPopup(html);
    });
  }

  /// RUN EVERYTHING
  let data = await getData();
  let map = initMap();
  populateMap(data.groups, data.meetings);
});
