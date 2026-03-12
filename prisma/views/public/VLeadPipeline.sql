SELECT
  id,
  name,
  phone,
  email,
  postcode,
  "serviceType",
  STATUS,
  source,
  "createdAt",
  "updatedAt",
  (
    EXTRACT(
      epoch
      FROM
        (NOW() - ("createdAt") :: timestamp WITH time zone)
    ) / (3600) :: numeric
  ) AS "ageHours"
FROM
  pb_leads;