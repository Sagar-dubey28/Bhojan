


export const updateUser = async (req, res, next) => {
        try {
            res.status(200).json({message:"good u r trying"})
        } catch (error) {
            next(error);
        }
    }