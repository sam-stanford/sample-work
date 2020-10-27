package database

import (
	"github.com/boltdb/bolt"
)

// =====================================
// ========= GLOBAL VARIABLES ==========
// =====================================

var database *bolt.DB

// =====================================
// ======== EXPORTED FUNCTIONS =========
// =====================================

// Init initialises the database for use - Must be called before any stores/fetches/deletes are completed
func Init(dbFilename string) error {

	// Open DB with 0600 permissions and no timeout
	var err error
	database, err = bolt.Open(dbFilename, 0600, nil)
	return err
}

// Close closes the database nicely - Should be called after all stores/fetches/deletes are completed
func Close() error {

	// Close database
	err := database.Close()
	return err
}

// CreateBucket creates a bucket with a given name
func CreateBucket(bucket string) error {

	// Open database for update
	err := database.Update(func(tx *bolt.Tx) error {
		// Create bucket
		_, err := tx.CreateBucketIfNotExists([]byte(bucket))
		return err
	})
	return err
}

// StoreKeyValue stores a given value using key in a given bucket
func StoreKeyValue(key string, value string, bucket string) error {

	// Open database for update (write)
	err := database.Update(func(tx *bolt.Tx) error {
		// Store KV pair in bucket
		err := tx.Bucket([]byte(bucket)).Put([]byte(key), []byte(value))
		return err
	})
	return err
}

// FetchValue fetches a value using a given key in a given bucket
func FetchValue(key string, bucket string) (string, error) {

	// Open database for viewing (read only)
	var value string
	err := database.View(func(tx *bolt.Tx) error {
		// Read value from key in bucket
		value = string(tx.Bucket([]byte(bucket)).Get([]byte(key)))
		return nil
	})
	return value, err
}

// DeleteKeyValue removes a given key and its respective value from a given bucket
func DeleteKeyValue(key string, bucket string) error {

	// Open database for update (write)
	err := database.Update(func(tx *bolt.Tx) error {
		// Delete KV pair from bucket
		err := tx.Bucket([]byte(bucket)).Delete([]byte(key))
		return err
	})
	return err
}
