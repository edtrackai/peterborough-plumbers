SELECT
  id,
  "waId",
  "customerName",
  "customerPhone",
  postcode,
  "serviceType",
  "botActive",
  "isEmergency",
  "leadCaptured",
  "lastMessageAt",
  "createdAt",
  (
    SELECT
      count(*) AS count
    FROM
      pb_wa_messages wm
    WHERE
      (wm."chatId" = wc.id)
  ) AS "totalMessages",
  (
    SELECT
      count(*) AS count
    FROM
      pb_wa_messages wm
    WHERE
      (
        (wm."chatId" = wc.id)
        AND (wm.role = 'user' :: text)
      )
  ) AS "userMessages",
  (
    SELECT
      count(*) AS count
    FROM
      pb_wa_messages wm
    WHERE
      (
        (wm."chatId" = wc.id)
        AND (wm.role = 'assistant' :: text)
      )
  ) AS "botMessages",
  (
    SELECT
      wm.content
    FROM
      pb_wa_messages wm
    WHERE
      (wm."chatId" = wc.id)
    ORDER BY
      wm."createdAt" DESC
    LIMIT
      1
  ) AS "lastMessage",
  (
    SELECT
      wm.role
    FROM
      pb_wa_messages wm
    WHERE
      (wm."chatId" = wc.id)
    ORDER BY
      wm."createdAt" DESC
    LIMIT
      1
  ) AS "lastMessageRole"
FROM
  pb_wa_chats wc;