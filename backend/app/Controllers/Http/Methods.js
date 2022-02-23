/**
 * .find()
 * .findOrFail()
 * .findBy
 * .findByOrFail
 * .first
 * .firstOrFail
 * .findOrCreate({ username: 'virk' },{ username: 'virk', email: 'virk@adonisjs.com' })
 * .pick(3)
 * .pickInverse(3)
 * .pair('id', 'country')
 * .all()
 * // WHERE //
 * -- FETCH --
 * .query().where('age', '>', 18).fetch()
 * -- UPDATE --
 * .query().where('username', 'virk').update({ role: 'admin' })
 * -- DELETE --
 * .query().where('role', 'guest').delete()
 * // CREATE //
 * request.only(['username', 'email', 'age']) // await User.create(userData)
 * request.collect(['username' 'email', 'age']) // User.createMany(usersData)
 * // JOINS //
 * await Database.table('users').innerJoin('accounts', 'user.id', 'accounts.user_id')
 * await Database.table('users').innerJoin('accounts', function () {this.on('users.id', 'accounts.user_id').orOn('users.id', 'accounts.owner_id')})
  // GROUP BY //
 * await Database.table('users').groupBy('age')
 * await Database.table('users').orderBy('id', 'desc')
 * await Database.table('users').groupBy('age').having('age', '>', 18)
 */
