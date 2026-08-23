const Contact = require("../models/ContactModel");
const nodemailer = require("nodemailer");

// @desc    Create a new contact message
// @route   POST /api/contact
// @access  Public
const createContact = async (req, res) => {
  try {
    const { name, email, message, phone } = req.body;

    // Simple validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Name, email, and message are required"
      });
    }

    // Create contact message
    const contact = await Contact.create({
      name,
      email,
      message,
      phone: phone || ""
    });

    res.status(201).json({
      success: true,
      message: "Contact message submitted successfully",
      data: contact
    });
  } catch (error) {
    console.error("Create contact error:", error);
    res.status(500).json({
      success: false,
      error: "Server error",
      message: error.message
    });
  }
};

// @desc    Get all contact messages (with optional pagination)
// @route   GET /api/contact
// @access  Private/Admin
const getAllContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Contact.countDocuments();

    res.status(200).json({
      success: true,
      count: contacts.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      data: contacts
    });
  } catch (error) {
    console.error("Get contacts error:", error);
    res.status(500).json({
      success: false,
      error: "Server error",
      message: error.message
    });
  }
};

// @desc    Get single contact message
// @route   GET /api/contact/:id
// @access  Private/Admin
const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: "Contact message not found"
      });
    }

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error("Get contact by ID error:", error);
    
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        error: "Contact message not found"
      });
    }

    res.status(500).json({
      success: false,
      error: "Server error",
      message: error.message
    });
  }
};

// @desc    Delete a contact message
// @route   DELETE /api/contact/:id
// @access  Private/Admin
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: "Contact message not found"
      });
    }

    await contact.deleteOne();

    res.status(200).json({
      success: true,
      message: "Contact message deleted successfully"
    });
  } catch (error) {
    console.error("Delete contact error:", error);
    
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        error: "Contact message not found"
      });
    }

    res.status(500).json({
      success: false,
      error: "Server error",
      message: error.message
    });
  }
};

// @desc    Update contact message status (e.g., mark as read)
// @route   PATCH /api/contact/:id
// @access  Private/Admin
const updateContactStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: "Contact message not found"
      });
    }

    // Add a status field if you want to track read/unread
    // First, update your schema to include a status field
    const updateData = {};
    if (status) updateData.status = status;
    if (notes) updateData.notes = notes;
    updateData.updatedAt = Date.now();

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Contact updated successfully",
      data: updatedContact
    });
  } catch (error) {
    console.error("Update contact error:", error);
    
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        error: "Contact message not found"
      });
    }

    res.status(500).json({
      success: false,
      error: "Server error",
      message: error.message
    });
  }
};

// @desc    Search contact messages
// @route   GET /api/contact/search
// @access  Private/Admin
const searchContacts = async (req, res) => {
  try {
    const { q, field } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        error: "Search query is required"
      });
    }

    let query = {};
    
    if (field) {
      // Search in specific field
      query[field] = { $regex: q, $options: "i" };
    } else {
      // Search in multiple fields
      query = {
        $or: [
          { name: { $regex: q, $options: "i" } },
          { email: { $regex: q, $options: "i" } },
          { message: { $regex: q, $options: "i" } },
          { phone: { $regex: q, $options: "i" } }
        ]
      };
    }

    const contacts = await Contact.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    console.error("Search contacts error:", error);
    res.status(500).json({
      success: false,
      error: "Server error",
      message: error.message
    });
  }
};

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASS,// App password, not regular password
  }
});

// Escape HTML so user input cannot inject HTML into the email
const escapeHtml = (value = "") => {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const createContactMail = async (req, res) => {
  try {
    const {
      name,
      email,
      message,
      phone,
    } = req.body;

    console.log("📨 CONTACT REQUEST");
    console.log("User:", email);
    console.log("Admin:", process.env.EMAIL_USER);

    // =========================================================
    // VALIDATION
    // =========================================================

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Name, email, and message are required",
      });
    }

    // =========================================================
    // SANITIZE DATA FOR EMAIL HTML
    // =========================================================

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);
    const safePhone = escapeHtml(phone || "");

    // =========================================================
    // SAVE CONTACT TO DATABASE
    // =========================================================

    const contact = await Contact.create({
      name,
      email,
      message,
      phone: phone || "",
    });

    console.log("✅ Contact saved:", contact._id);

    // =========================================================
    // COMMON VALUES
    // =========================================================

    const messageId = contact._id.toString();
    const receivedAt = new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    // =========================================================
    // ADMIN EMAIL
    // =========================================================

    const mailOptions = {
      from: `"Nishitha Reddy Portfolio" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,

      subject: `New Portfolio Message • ${name}`,

      html: `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>New Portfolio Message</title>
</head>

<body
  style="
    margin:0;
    padding:0;
    background:#f1f5f9;
    font-family:Arial,Helvetica,sans-serif;
  "
>

  <!-- MAIN WRAPPER -->

  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="background:#f1f5f9;padding:35px 15px;"
  >

    <tr>
      <td align="center">

        <!-- EMAIL CARD -->

        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            max-width:650px;
            background:#ffffff;
            border-radius:20px;
            overflow:hidden;
            box-shadow:0 12px 35px rgba(15,23,42,0.10);
          "
        >

          <!-- ========================================= -->
          <!-- HEADER -->
          <!-- ========================================= -->

          <tr>
            <td
              style="
                padding:40px 35px;
                background:linear-gradient(
                  135deg,
                  #4f46e5 0%,
                  #7c3aed 50%,
                  #9333ea 100%
                );
                color:#ffffff;
              "
            >

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
              >

                <tr>

                  <td>

                    <div
                      style="
                        display:inline-block;
                        padding:7px 12px;
                        border:1px solid rgba(255,255,255,.25);
                        border-radius:30px;
                        font-size:11px;
                        font-weight:bold;
                        letter-spacing:1.5px;
                        text-transform:uppercase;
                        color:#ffffff;
                        background:rgba(255,255,255,.10);
                      "
                    >
                      PORTFOLIO CONTACT
                    </div>

                    <h1
                      style="
                        margin:18px 0 8px;
                        font-size:30px;
                        line-height:1.25;
                        color:#ffffff;
                      "
                    >
                      New Message Received
                    </h1>

                    <p
                      style="
                        margin:0;
                        color:#e0e7ff;
                        font-size:14px;
                        line-height:1.6;
                      "
                    >
                      Someone has contacted you through your portfolio website.
                    </p>

                  </td>

                  <td
                    width="70"
                    align="right"
                    valign="middle"
                  >

                    <div
                      style="
                        width:58px;
                        height:58px;
                        line-height:58px;
                        text-align:center;
                        border-radius:50%;
                        background:rgba(255,255,255,.15);
                        border:1px solid rgba(255,255,255,.25);
                        color:#ffffff;
                        font-size:26px;
                        font-weight:bold;
                      "
                    >
                      ✉
                    </div>

                  </td>

                </tr>

              </table>

            </td>
          </tr>

          <!-- ========================================= -->
          <!-- CONTENT -->
          <!-- ========================================= -->

          <tr>

            <td
              style="
                padding:35px;
                background:#ffffff;
              "
            >

              <!-- SENDER TITLE -->

              <div
                style="
                  color:#6366f1;
                  font-size:11px;
                  font-weight:bold;
                  letter-spacing:1.5px;
                  text-transform:uppercase;
                  margin-bottom:12px;
                "
              >
                Sender Information
              </div>

              <!-- SENDER CARD -->

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                style="
                  background:#f8fafc;
                  border:1px solid #e2e8f0;
                  border-radius:14px;
                  margin-bottom:28px;
                "
              >

                <tr>

                  <td
                    style="
                      padding:20px;
                    "
                  >

                    <!-- NAME -->

                    <p
                      style="
                        margin:0 0 16px;
                        font-size:13px;
                        color:#64748b;
                      "
                    >

                      <strong
                        style="
                          display:block;
                          margin-bottom:5px;
                          color:#334155;
                          font-size:12px;
                          text-transform:uppercase;
                          letter-spacing:.7px;
                        "
                      >
                        Name
                      </strong>

                      <span
                        style="
                          color:#0f172a;
                          font-size:15px;
                          font-weight:600;
                        "
                      >
                        ${safeName}
                      </span>

                    </p>

                    <!-- EMAIL -->

                    <p
                      style="
                        margin:0 0 16px;
                        font-size:13px;
                        color:#64748b;
                      "
                    >

                      <strong
                        style="
                          display:block;
                          margin-bottom:5px;
                          color:#334155;
                          font-size:12px;
                          text-transform:uppercase;
                          letter-spacing:.7px;
                        "
                      >
                        Email
                      </strong>

                      <a
                        href="mailto:${safeEmail}"
                        style="
                          color:#4f46e5;
                          font-size:15px;
                          font-weight:600;
                          text-decoration:none;
                        "
                      >
                        ${safeEmail}
                      </a>

                    </p>

                    <!-- PHONE -->

                    ${
                      phone
                        ? `
                    <p
                      style="
                        margin:0;
                        font-size:13px;
                        color:#64748b;
                      "
                    >

                      <strong
                        style="
                          display:block;
                          margin-bottom:5px;
                          color:#334155;
                          font-size:12px;
                          text-transform:uppercase;
                          letter-spacing:.7px;
                        "
                      >
                        Phone
                      </strong>

                      <span
                        style="
                          color:#0f172a;
                          font-size:15px;
                          font-weight:600;
                        "
                      >
                        ${safePhone}
                      </span>

                    </p>
                    `
                        : ""
                    }

                  </td>

                </tr>

              </table>

              <!-- MESSAGE TITLE -->

              <div
                style="
                  color:#6366f1;
                  font-size:11px;
                  font-weight:bold;
                  letter-spacing:1.5px;
                  text-transform:uppercase;
                  margin-bottom:12px;
                "
              >
                Message
              </div>

              <!-- MESSAGE BOX -->

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                style="
                  margin-bottom:30px;
                "
              >

                <tr>

                  <td
                    style="
                      border-left:4px solid #6366f1;
                      background:#f8fafc;
                      border-radius:0 12px 12px 0;
                      padding:20px;
                      color:#334155;
                      font-size:15px;
                      line-height:1.8;
                    "
                  >

                    ${safeMessage.replace(/\n/g, "<br/>")}

                  </td>

                </tr>

              </table>

              <!-- REPLY BUTTON -->

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
              >

                <tr>

                  <td align="center">

                    <a
                      href="mailto:${safeEmail}"
                      style="
                        display:inline-block;
                        padding:14px 28px;
                        background:#4f46e5;
                        color:#ffffff;
                        text-decoration:none;
                        border-radius:10px;
                        font-size:14px;
                        font-weight:bold;
                        box-shadow:0 6px 16px rgba(79,70,229,.25);
                      "
                    >
                      Reply to ${safeName}
                    </a>

                  </td>

                </tr>

              </table>

              <!-- DIVIDER -->

              <div
                style="
                  height:1px;
                  background:#e2e8f0;
                  margin:30px 0 20px;
                "
              ></div>

              <!-- META -->

              <p
                style="
                  margin:0 0 6px;
                  color:#94a3b8;
                  font-size:11px;
                "
              >
                Message ID: ${messageId}
              </p>

              <p
                style="
                  margin:0;
                  color:#94a3b8;
                  font-size:11px;
                "
              >
                Received: ${receivedAt}
              </p>

            </td>

          </tr>

          <!-- ========================================= -->
          <!-- FOOTER -->
          <!-- ========================================= -->

          <tr>

            <td
              style="
                padding:25px 30px;
                background:#0f172a;
                text-align:center;
              "
            >

              <p
                style="
                  margin:0 0 6px;
                  color:#ffffff;
                  font-size:14px;
                  font-weight:bold;
                "
              >
                Nishitha Reddy
              </p>

              <p
                style="
                  margin:0;
                  color:#94a3b8;
                  font-size:11px;
                "
              >
                Portfolio Contact Notification
              </p>

            </td>

          </tr>

        </table>

      </td>
    </tr>

  </table>

</body>
</html>
`,
    };

    // =========================================================
    // AUTO REPLY TO USER
    // =========================================================

    const autoReplyOptions = {
      from: `"Nishitha Reddy" <${process.env.EMAIL_USER}>`,
      to: email,
      replyTo: process.env.EMAIL_USER,

      subject: "Thank you for contacting me ✨",

      html: `
<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>Thank You</title>

</head>

<body
  style="
    margin:0;
    padding:0;
    background:#f1f5f9;
    font-family:Arial,Helvetica,sans-serif;
  "
>

  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="
      background:#f1f5f9;
      padding:35px 15px;
    "
  >

    <tr>

      <td align="center">

        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            max-width:650px;
            background:#ffffff;
            border-radius:20px;
            overflow:hidden;
            box-shadow:0 12px 35px rgba(15,23,42,.10);
          "
        >

          <!-- HEADER -->

          <tr>

            <td
              style="
                padding:45px 30px;
                text-align:center;
                background:linear-gradient(
                  135deg,
                  #4f46e5,
                  #7c3aed,
                  #9333ea
                );
                color:#ffffff;
              "
            >

              <div
                style="
                  width:64px;
                  height:64px;
                  line-height:64px;
                  margin:0 auto 18px;
                  border-radius:50%;
                  background:rgba(255,255,255,.15);
                  border:1px solid rgba(255,255,255,.25);
                  font-size:28px;
                  font-weight:bold;
                "
              >
                ✓
              </div>

              <h1
                style="
                  margin:0 0 10px;
                  color:#ffffff;
                  font-size:30px;
                "
              >
                Thank You!
              </h1>

              <p
                style="
                  margin:0;
                  color:#e0e7ff;
                  font-size:14px;
                  line-height:1.6;
                "
              >
                Your message has been received successfully.
              </p>

            </td>

          </tr>

          <!-- CONTENT -->

          <tr>

            <td
              style="
                padding:35px;
              "
            >

              <h2
                style="
                  margin:0 0 15px;
                  color:#0f172a;
                  font-size:22px;
                "
              >
                Hi ${safeName},
              </h2>

              <p
                style="
                  margin:0 0 20px;
                  color:#475569;
                  font-size:15px;
                  line-height:1.8;
                "
              >
                Thank you for taking the time to contact me through my
                portfolio. I've received your message and will get back
                to you as soon as possible.
              </p>

              <!-- RESPONSE TIME -->

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                style="
                  margin-bottom:28px;
                  background:#f5f3ff;
                  border:1px solid #ddd6fe;
                  border-radius:14px;
                "
              >

                <tr>

                  <td
                    style="
                      padding:20px;
                    "
                  >

                    <p
                      style="
                        margin:0 0 5px;
                        color:#6d28d9;
                        font-size:11px;
                        font-weight:bold;
                        letter-spacing:1px;
                        text-transform:uppercase;
                      "
                    >
                      Expected Response
                    </p>

                    <p
                      style="
                        margin:0;
                        color:#4c1d95;
                        font-size:14px;
                        line-height:1.6;
                      "
                    >
                      I’ll get back to you within 24 hours.
                    </p>

                  </td>

                </tr>

              </table>

              <!-- YOUR MESSAGE -->

              <div
                style="
                  margin-bottom:10px;
                  color:#6366f1;
                  font-size:11px;
                  font-weight:bold;
                  letter-spacing:1.5px;
                  text-transform:uppercase;
                "
              >
                Your Message
              </div>

              <div
                style="
                  background:#f8fafc;
                  border-left:4px solid #8b5cf6;
                  border-radius:0 12px 12px 0;
                  padding:20px;
                  color:#475569;
                  font-size:14px;
                  line-height:1.8;
                  margin-bottom:30px;
                "
              >

                ${safeMessage.substring(0, 500).replace(/\n/g, "<br/>")}

                ${
                  message.length > 500
                    ? "<br/><br/><span style='color:#94a3b8;'>Message shortened for preview...</span>"
                    : ""
                }

              </div>

              <!-- SIGNATURE -->

              <div
                style="
                  border-top:1px solid #e2e8f0;
                  padding-top:25px;
                "
              >

                <p
                  style="
                    margin:0 0 5px;
                    color:#64748b;
                    font-size:14px;
                  "
                >
                  Regards,
                </p>

                <p
                  style="
                    margin:0;
                    color:#4f46e5;
                    font-size:18px;
                    font-weight:bold;
                  "
                >
                  Nishitha Reddy
                </p>

                <p
                  style="
                    margin:5px 0 0;
                    color:#94a3b8;
                    font-size:12px;
                  "
                >
                  Full Stack Developer
                </p>

              </div>

            </td>

          </tr>

          <!-- FOOTER -->

          <tr>

            <td
              style="
                padding:25px 30px;
                background:#0f172a;
                text-align:center;
              "
            >

              <p
                style="
                  margin:0 0 6px;
                  color:#e2e8f0;
                  font-size:13px;
                "
              >
                Thank you for connecting with me.
              </p>

              <p
                style="
                  margin:0;
                  color:#64748b;
                  font-size:11px;
                "
              >
                This is an automated confirmation email.
              </p>

            </td>

          </tr>

        </table>

      </td>

    </tr>

  </table>

</body>

</html>
`,
    };

    // =========================================================
    // SEND ADMIN EMAIL
    // =========================================================

    console.log("📧 Sending admin email...");

    const info1 = await transporter.sendMail(mailOptions);

    console.log(
      "✅ ADMIN MAIL SENT:",
      info1.messageId || info1.response
    );

    // =========================================================
    // SEND USER AUTO REPLY
    // =========================================================

    console.log("📧 Sending auto-reply to user...");

    const info2 = await transporter.sendMail(autoReplyOptions);

    console.log(
      "✅ USER MAIL SENT:",
      info2.messageId || info2.response
    );

    // =========================================================
    // SUCCESS RESPONSE
    // =========================================================

    return res.status(201).json({
      success: true,
      message: "Contact message submitted successfully!",
      data: contact,
    });

  } catch (error) {

    console.error("❌ CONTACT MAIL ERROR:", error);

    return res.status(500).json({
      success: false,
      error: "Server error",
      message: error.message,
    });
  }
};

module.exports = {
  createContact,
  createContactMail,
  getAllContacts,
  getContactById,
  deleteContact,
  updateContactStatus,
  searchContacts
};


