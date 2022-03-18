const { Issue, Trail, Park } = require('./db');

const checkParksForIssues = (park) => park.trails.filter((trail) => trail.issues.length);

module.exports = {
  createNewPark: ({ data }) => {
    const parkSubmission = data;
    console.log(data);
    const trails = parkSubmission.trails.map((trail) => new Trail({
      name: trail.name,
      marker: trail.markerShortHand,
      lastMarker: trail.lastMarker,
      park: parkSubmission.parkName,
    }));

    const park = new Park({
      parkName: parkSubmission.parkName,
      trails,
    });

    return park.save();
  },
  createNewIssue: ({ data }) => {
    const { park, trail } = data;
    const issue = new Issue({
      marker: data.marker,
      summary: data.summary,
      description: data.description,
    });

    return Park.findOne({ parkName: park })
      .then((parkData) => {
        parkData.trails
          .find((where) => where.name === trail)
          .issues.push(issue);
        parkData.save();
      });
  },
  getAllIssues: async (req, res) => {
    const parks = await Park.find();
    const trailsWithIssues = [...parks.map((park) => checkParksForIssues(park))].flat();
    res.status(200).send(trailsWithIssues);
  },
  deleteIssue: ({ data }) => {
    const { park, trail, id } = data;
    return Park.findOne({ parkName: park })
      .then((parkData) => {
        parkData.trails.find((where) => where.name === trail)
          .issues.filter((issue) => !(issue.id === id));
        parkData.save();
      });
  },
  findParkByName: ({ data }) => Park.findOne({ parkName: data }),
};

/*
Dante
- D
- 80

Ripheus
- R
- 9

Nimrod
- N
- 10

OvidEast
- OE
- 4

OvidWest
- OW
- 7

Virgil
- V
- 8

LimboLoop
- LL
- 20

Sinon
- S
- 3

Beatrice
- B
- 24

Malacoda
- M
- 12

Paraiso
- P
- 21
*/
