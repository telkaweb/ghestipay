const STATUSES = {
  digital_signature_status: {
          "pending_payment" : 'در انتظار پرداخت',
      "payment_confirmed" : 'پرداخت تأیید شده',
      "video_uploaded" : 'ویدیو آپلود شده',
      "video_verified" : 'ویدیو تأیید شده',
      "video_rejected" : 'ویدیو رد شده',
      "signature_uploaded" : 'امضا آپلود شده',
      "signature_verified" : 'امضا تأیید شده',
      "signature_rejected" : 'امضا رد شده',
      "token_issued" : 'توکن صادر شده',
      "expired" : 'منقضی شده',
  },
  digital_signature: {
    request_statuses: [
      "pending_payment",
      "payment_confirmed",
      "video_uploaded",
      "video_verified",
      "video_rejected",
      "signature_uploaded",
      "signature_verified",
      "signature_rejected",
      "token_issued",
      "expired",
    ],

    video_review_statuses: [
      "approved",
      "rejected",
    ],

    signature_review_statuses: [
      "approved",
      "rejected",
    ],
  },

  identity_verification: {
    statuses: [
      "pending",
      "verified",
    ],
  },

  credit_score_status: {
      "checked" : 'انجام شده',
      "pending_payment" : 'در انتظار پرداخت',
      "payment_confirmed" : 'پرداخت تأیید شده',
  },

  credit_score: {
    statuses: [
      "checked",
      "pending_payment",
      "payment_confirmed",
    ],

    payment_statuses: [
      "confirmed",
    ],

    grades: [
      "C",
      "B",
      "B+",
      "A",
      "A+",
    ],
  },
};

export default STATUSES;