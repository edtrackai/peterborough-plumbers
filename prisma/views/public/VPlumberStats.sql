SELECT
  p.id,
  p.name,
  p.email,
  p.phone,
  p."isActive",
  p."isOnDuty",
  p."lastSeenAt",
  p."createdAt",
  count(b.id) AS "totalBookings",
  count(b.id) FILTER (
    WHERE
      (b.status = 'completed' :: text)
  ) AS "completedBookings",
  count(b.id) FILTER (
    WHERE
      (
        b.status = ANY (
          ARRAY ['accepted'::text, 'en_route'::text, 'arrived'::text, 'in_progress'::text]
        )
      )
  ) AS "activeBookings",
  count(b.id) FILTER (
    WHERE
      (b.status = 'cancelled' :: text)
  ) AS "cancelledBookings",
  round(avg(br.stars), 1) AS "avgRating",
  count(br.id) AS "totalRatings",
  count(bo.id) FILTER (
    WHERE
      (bo.status = 'offered' :: text)
  ) AS "pendingOffers",
  count(bo.id) FILTER (
    WHERE
      (bo.status = 'rejected' :: text)
  ) AS "rejectedOffers"
FROM
  (
    (
      (
        pb_plumbers p
        LEFT JOIN pb_bookings b ON ((b."assignedPlumberId" = p.id))
      )
      LEFT JOIN pb_booking_ratings br ON ((br."bookingId" = b.id))
    )
    LEFT JOIN pb_booking_offers bo ON ((bo."plumberId" = p.id))
  )
GROUP BY
  p.id,
  p.name,
  p.email,
  p.phone,
  p."isActive",
  p."isOnDuty",
  p."lastSeenAt",
  p."createdAt";