module.exports = async function (
  db,
  { workerValues, serviceValues, allServiceSchedulesValues }
) {
  const insertedWorker = await db.run(`
        INSERT INTO worker (
            name,
            whatsapp,
            sex,
            city,
            state,
            avatar,
            bio
        ) VALUES (
            "${workerValues.name}",
            "${workerValues.whatsapp}",
            "${workerValues.sex}",
            "${workerValues.city}",
            "${workerValues.state}",
            "${workerValues.avatar}",
            "${workerValues.bio}"
        );
    `);

  const workerId = insertedWorker.lastID;

  const insertedService = await db.run(`
        INSERT INTO service (
            profession,
            cost,
            worker_id
        ) VALUES (
            "${serviceValues.profession}",
            "${serviceValues.cost}",
            "${workerId}"
        );
    `);

  const serviceId = insertedService.lastID;

  const insertedAllServiceSchedulesValues = allServiceSchedulesValues.map(
    (serviceScheduleValues) => {
      db.run(`
            INSERT INTO service_schedule (
                service_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${serviceId}",
                "${serviceScheduleValues.weekday}",
                "${serviceScheduleValues.time_from}",
                "${serviceScheduleValues.time_to}"
            );
        `);
    }
  );

  await Promise.all(insertedAllServiceSchedulesValues);
};
