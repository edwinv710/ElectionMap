require 'active_support/concern'

module JsonBuilder
  extend ActiveSupport::Concern

  included do
    def builder(*args)
      self.define_singleton_method(:to_builder) do |*args|
         Jbuilder.new do |json|
            
         end
      end
    end
  end

  class_methods do
     
  end
end