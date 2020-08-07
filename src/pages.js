const database = require("./database/db");
const { professions, weekdays, getProfession } = require("./utils/format");

function setWorkerAvatar(sex, avatar) {
  if (avatar == "") {
    //console.log("Sem foto!");
    if (sex == "M") {
      return (avatar = "./images/male_user.png");
    } else {
      return (avatar = "./images/female_user.png");
    }
  }
  return avatar;
}

function convertTimeToMinutes(time) {
  const [hour, minutes] = time.split(":");
  return Number(hour * 60 + minutes);
}

function pageLanding(req, res) {
  return res.render("index.html");
}

async function pageWorker(req, res) {
  const filters = req.query;

  if (!filters.profession || !filters.weekday || !filters.city) {
    return res.render("find_worker.html", {
      filters: filters,
      professions: professions,
      weekdays: weekdays,
    });
  }

  const query = `
    SELECT worker.*, service.* 
    FROM worker 
    JOIN service ON (service.worker_id = worker.id) 
    WHERE EXISTS (
      SELECT service_schedule.*
      FROM service_schedule 
      WHERE service_schedule.service_id = service.id  
      AND service_schedule.weekday = ${filters.weekday}
    )
    OR worker.city = "${filters.city}";
  `;

  try {
    const db = await database;
    const workers = await db.all(query);

    workers.map((worker) => {
      worker.profession = getProfession(worker.profession);
    });

    return res.render("find_worker.html", {
      workers: workers,
      filters: filters,
      professions: professions,
      weekdays: weekdays,
    });
  } catch (error) {
    console.log(error);
  }
}

function pagePostService(req, res) {
  return res.render("post_service.html", {
    professions: professions,
    weekdays: weekdays,
  });
}

async function savePostService(req, res) {
  const createWorker = require("./database/createWorker");

  const workerValues = {
    name: req.body.name,
    whatsapp: req.body.whatsapp,
    sex: req.body.sex,
    city: req.body.city,
    state: req.body.state,
    avatar: setWorkerAvatar(req.body.sex, req.body.avatar),
    bio: req.body.bio,
  };

  const serviceValues = {
    profession: req.body.profession,
    cost: req.body.cost,
  };

  const allServiceSchedulesValues = req.body.weekday.map((weekday, index) => {
    return {
      weekday: weekday,
      time_from: convertTimeToMinutes(req.body.time_from[index]),
      time_to: convertTimeToMinutes(req.body.time_to[index]),
    };
  });

  try {
    const db = await database;

    await createWorker(db, {
      workerValues,
      serviceValues,
      allServiceSchedulesValues,
    });

    let queryString =
      "city=" +
      req.body.city +
      "&profession=" +
      req.body.profession +
      "&weekday=" +
      req.body.weekday[0];

    return res.redirect("/find_worker?" + queryString);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  pageLanding,
  pageWorker,
  pagePostService,
  savePostService,
};
