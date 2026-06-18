import jwt from "jsonwebtoken";

const generateToken = (res, user) => {

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "3d"
        }
    );

    res.cookie(
        "token",
        token,
        {
            httpOnly: true,

            secure:
                process.env.NODE_ENV === "production",

            sameSite:
                process.env.NODE_ENV === "production"
                ? "none"
                : "lax",

            maxAge:
                3*24 * 60 * 60 * 1000
        }
    );

    return token;
};

export default generateToken;
