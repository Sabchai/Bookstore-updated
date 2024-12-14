const Subscriber = require("./subscribe.model");

// Controlador para manejar la suscripción
const subscribeUser = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();
    res.status(200).json({ message: "Subscribed successfully!" });
  } catch (error) {
    if (error.code === 11000) {
      // Error de email duplicado
      res.status(400).json({ error: "This email is already subscribed." });
    } else {
      console.error("Error saving subscription:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

// Obtener el total de suscriptores
const getTotalSubscribers = async (req, res) => {
  try {
    const totalSubscribers = await Subscriber.countDocuments();
    res.status(200).json({ totalSubscribers });
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { subscribeUser, getTotalSubscribers };
