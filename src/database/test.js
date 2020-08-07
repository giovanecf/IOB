const dbTest = require("./db");
const createWorker = require("./createWorker");

dbTest.then(async (db) => {
  workerValues = {
    name: "Seu Antônio",
    whatsapp: "21 987612221",
    sex: "M",
    city: "Itaboraí",
    state: "RJ",
    avatar:
      "https://4.bp.blogspot.com/-x-QlnKh3EXA/VBYmfS52gQI/AAAAAAAAZf4/xd1myDqzcrM/s1600/SAM_4153.JPG",
    bio:
      "Entusiasta das melhores tecnologias de construção civil avançada.<br><br> Apaixonado por explodir coisas em terrenos e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
  };

  serviceValues = {
    profession: 8,
    cost: "90",
  };

  allServiceSchedulesValues = [
    {
      weekday: 2,
      time_from: 720,
      time_to: 1220,
    },

    {
      weekday: 4,
      time_from: 720,
      time_to: 1220,
    },

    {
      weekday: 6,
      time_from: 720,
      time_to: 1220,
    },
  ];

  /*await createWorker(db, {
    workerValues,
    serviceValues,
    allServiceSchedulesValues,
  });*/

  const selectedWorkers = await db.all(
    "SELECT * FROM worker, service, service_schedule;"
  );
  //console.log(selectedWorkers);

  const selectedWorkersWithData = await db.all(`
    SELECT worker.*, service.* 
    FROM worker 
    JOIN service ON (service.worker_id = worker.id) 
    WHERE service.worker_id = 1; 
  `);
  //console.log(selectedWorkersWithData);

  const selectedFilterServiceSchedule = await db.all(`
  SELECT worker.name, service.profession
  FROM worker 
  JOIN service ON (service.worker_id = worker.id) 
  WHERE EXISTS (
    SELECT service_schedule.*
    FROM service_schedule 
    WHERE service_schedule.service_id = service.id  
    AND service_schedule.weekday = 8
  )
  OR worker.city = "Itaboraí";
  `);

  console.log(selectedFilterServiceSchedule);
});
