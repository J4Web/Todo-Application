export const errors = (err, req, res, next) => {
    console.error("Encounter an error", err);
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).send({
        ok: false,
        message: "Internal Server Error",
        error: err instanceof Error ? err.message : "Unknown error",
    });
};
