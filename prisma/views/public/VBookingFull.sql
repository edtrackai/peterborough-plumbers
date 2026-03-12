SELECT
  b.id,
  b."bookingRef",
  b.status,
  b.postcode,
  b."zonePrefix",
  b."serviceType",
  b.description,
  b."customerName",
  b.phone,
  b.email,
  b.address,
  b."accessNotes",
  b."reservedAt",
  b."confirmedAt",
  b."completedAt",
  b."estimatedArrival",
  b."expiresAt",
  b."createdAt",
  b."updatedAt",
  ts.date AS "slotDate",
  ts."startTime" AS "slotStart",
  ts."endTime" AS "slotEnd",
  p.id AS "plumberId",
  p.name AS "plumberName",
  p.email AS "plumberEmail",
  p.phone AS "plumberPhone",
  p."isOnDuty" AS "plumberOnDuty",
  br.stars AS "ratingStars",
  br.comment AS "ratingComment",
  (
    SELECT
      count(*) AS count
    FROM
      pb_booking_offers o
    WHERE
      (o."bookingId" = b.id)
  ) AS "offerCount",
  (
    SELECT
      count(*) AS count
    FROM
      pb_booking_images i
    WHERE
      (i."bookingId" = b.id)
  ) AS "imageCount"
FROM
  (
    (
      (
        pb_bookings b
        LEFT JOIN pb_time_slots ts ON ((ts.id = b."slotId"))
      )
      LEFT JOIN pb_plumbers p ON ((p.id = b."assignedPlumberId"))
    )
    LEFT JOIN pb_booking_ratings br ON ((br."bookingId" = b.id))
  );