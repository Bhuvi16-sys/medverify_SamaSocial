import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{ collection: 'users' },
)

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next()
	try {
		const salt = await bcrypt.genSalt(10)
		this.password = await bcrypt.hash(this.password, salt)
		next()
	} catch (err) {
		next(err)
	}
})

userSchema.methods.comparePassword = async function (plainPassword) {
	return bcrypt.compare(plainPassword, this.password)
}

export default mongoose.model('User', userSchema)
